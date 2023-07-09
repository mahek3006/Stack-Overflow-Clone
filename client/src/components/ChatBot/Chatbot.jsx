import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import {Configuration, OpenAIApi} from "openai"

const theme = {
  background: "#F5F5F5",
  headerBgColor: "#2F3F4F",
  headerFontSize: "20px",
  botBubbleColor: "#E0EAF1",
  headerFontColor: "white",
  botFontColor: "#1A2232",
  userBubbleColor: "#E0EAF1",
  userFontColor: "#1A2232",
};

const config = {
  floating: true,
};

function GoToPage() {
  window.location.href = window.location.href + "VerifyOtp";
  return <p> Redirecting to OTP Verificatoin page</p>;
}

const QueryResponse = ({step, steps, previousStep, triggerNextStep}) => {
  const [answer,setAnswer] = useState('')

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI
  })
  const openai = new OpenAIApi(configuration)

  const getResponse = async (prompt) => {
    try {
      const response = await openai.createCompletion({
        model:"text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 150,
        temperature:0,
        top_p:1,
        frequency_penalty:0.0,
        presence_penalty:0.0,
      })
      setAnswer(response.data.choices[0].text)
    } catch (error) {
      setAnswer(error.message + ". Try again after sometime.")
    }
  }

  useEffect(()=>{
    getResponse(steps.query.value)
  })

  return(
    <div style={{ width: '100%' }}>
      <p>{answer}</p>
    </div>
  )
}

const Chatbot = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot headerTitle="Chat Bot"
         steps={[
            {
              id: "greet",
              message: "Hello, welcome to chatbot!",
              trigger: "askO"
            },
            {
              id: "askO",
              message: "Is your mobile no. verified ?",
              trigger: "OTPYN",
            },
            {
              id: "OTPYN",
              options: [
                { value: "yes-v", label: "Yes", trigger: "yes-v" },
                { value: "no-v", label: "No", trigger: "no-v" },
              ],
            },
            {
              id: "no-v",
              component: <GoToPage />,
              asMessage: true,
              end: true,
            },
            {
              id: "yes-v",
              message: "Great, How can I help you?",
              trigger: "query",
            },
            {
              id: "query",
              user: true,
              trigger: "question",
            },
            {
              id: "question",
              component: <QueryResponse />,
              asMessage: true,
              trigger: "more",
            },
            {
              id: "more",
              message: "Do you need any more assistance?",
              trigger: "more-options",
              end: false,
              delay: 5000,
            },
            {
              id: "more-options",
              options: [
                { value: "yes", label: "Yes", trigger: "yes-v" },
                { value: "no", label: "No, I am done", trigger: "end-message" },
              ],
            },
            {
              id: "end-message",
              message: "Thank you for using our chatbot. Have a nice day!",
              trigger: "waiting2",
              end: false,
            },
            {
              id: "waiting2",
              user: true,
              trigger: "greet",
            },
          ]}
         {...config} />
      </ThemeProvider>
    </div>
  );
};

export default Chatbot;
