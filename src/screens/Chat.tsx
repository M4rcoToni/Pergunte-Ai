import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { MotiText } from "moti";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import { chatGetAll } from "../storage/chat/chatGetAll";
import { MessageStorageDTO } from "../storage/chat/ChatStorageDTO";
import { chatCreate } from "../storage/chat/chatCreate";

import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { Alert } from "../components/Alert";
import { Message } from "../components/Message";
import { ChatEmpty } from "../components/ChatEmpty";

import { getDay } from "../utils/dayjs";
import { messageChangeTitle } from "../storage/message/messageChangeTitle";
import TypeWriter from "react-native-typewriter";

type RouteParams = {
  chatid: string;
  title: string;
};

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

export function Chat() {
  const route = useRoute();
  const param = route.params as RouteParams;
  const navigation = useNavigation();

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState<MessageStorageDTO[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  async function handleFetchDataOpenAi() {
    const prompt = description.trim();
    const time = getDay({ format: "HH:mm" });

    if (prompt.length < 10) {
      setIsAlertVisible(true);
      return;
    }
    setDescription("");

    setResponse((prevResponses) => [
      ...prevResponses,
      { message: prompt, createdAt: time },
    ]);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            temperature: 0.22,
            max_tokens: 600,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );
      const data = await response.json();

      if (data && data.choices && data.choices.length > 0) {
        const responseText = data.choices[0].text;

        setResponse((prevResponses) => [
          ...prevResponses,
          {
            message: responseText.trim(),
            createdAt: getDay({ format: "HH:mm" }),
          },
        ]);
      } else {
        console.log("Erro", "Não foi possível.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData(chatid: string) {
    try {
      const chatData = await chatGetAll(chatid);
      const response = chatData.data;
      console.log("CHAT", chatData);

      if (response) {
        setResponse(response);
      }
    } catch (error) {
      console.log("fetchData error", error);
    }
  }

  async function saveData() {
    try {
      const chat = await chatGetAll(param.chatid);

      if (response[0].message) {
        await handleChangeTitle(param.chatid, response[0].message);
      }

      await chatCreate(
        {
          title: title,
          chatid: param.chatid,
          data: response,
          createdAt: chat.createdAt,
        },
        param.chatid
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeTitle(chatid: string, title: string) {
    try {
      if (param.title === "Novo Chat") {
        await messageChangeTitle(chatid, title);
        setTitle(response[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (param != undefined) {
      fetchData(param.chatid);
    }
  }, []);

  useEffect(() => {
    saveData();
  }, [response]);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#00a5ce", "#b000c3"]}
        start={[0, 0]}
        end={[1, 0]}
        className="flex-1"
      >
        <View className="h-24 flex-row pt-4 px-4  items-center">
          <Icon
            className="h-12 w-12"
            background="bg-trans-100"
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </Icon>
          <TypeWriter
            className="pl-6 font-bold text-white text-xl tracking-wider"
            typing={1}
            numberOfLines={1}
          >
            {title ? title.slice(0, 20) : param.title.slice(0, 20)}
          </TypeWriter>
        </View>

        {response.length ? (
          <FlatList
            className="flex-1 py-6 px-3 rounded-t-3xl bg-gray-back "
            data={response}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Message
                key={index}
                createdAt={item.createdAt}
                message={item.message}
                response={index % 2 !== 1}
              />
            )}
            contentContainerStyle={[
              response.length === 0 && { flex: 1, justifyContent: "center" },
              { paddingBottom: 140 },
            ]}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ChatEmpty title="Bem vindo," message="como posso te ajudar?" />
        )}

        <View className="absolute bottom-5 mb-3 mx-4 ">
          <Input
            onChangeText={setDescription}
            value={description}
            onPress={handleFetchDataOpenAi}
          />
        </View>
      </LinearGradient>

      <Alert
        visible={isAlertVisible}
        onConfirmPressed={() => setIsAlertVisible(false)}
        title={"Atenção"}
        message={"Digite uma pergunta"}
        confirmText={"Ok"}
      />
    </View>
  );
}
