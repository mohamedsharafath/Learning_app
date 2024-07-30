import React, { useState, useEffect } from "react";
import { Card, Button, Radio, Typography } from "antd";

const { Title } = Typography;

const api_server = "http://127.0.0.1:8000";

const ExportButton = ({ data, selected }) => {
  const handleExport = async () => {
    try {
        const response = await fetch(`${api_server}/export`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data, selected }),
        });

        if (!response.ok) {
            throw new Error("Failed to export");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = selected === 0 ? "Summary.docx" : selected === 1 ? "Flashcards.docx" : "Quiz.docx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('There was an error exporting the document!', error);
    }
};

    return (
        <Button
            onClick={handleExport}
            className="button-default"
            style={{ marginTop: "20px", marginBottom: "20px" }}
        >
            Export {selected === 0 ? "Summary" : selected === 1 ? "Flashcards" : "Quiz"}
        </Button>
    );
};
const Quiz = ({ response }) => {
  const [quizData, setQuizData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (response && response.quiz) {
      setQuizData(response.quiz);
      setUserAnswers(Array(response.quiz.length).fill(null));
    }
  }, [response]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.index) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setUserAnswers(Array(quizData.length).fill(null));
    setScore(null);
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Quiz</Title>
      <ExportButton data={quizData} selected={2} />
      {quizData.map((question, questionIndex) => (
        <Card key={questionIndex} style={{ marginBottom: "20px" }}>
          <Title level={4}>{question.question}</Title>
          <Radio.Group
            onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
            value={userAnswers[questionIndex]}
            disabled={submitted}
          >
            {question.possible_answers.map((answer, answerIndex) => {
              let backgroundColor = 'initial';
              if (submitted) {
                if (answerIndex === question.index) {
                  backgroundColor = 'lightgreen';
                } else if (answerIndex === userAnswers[questionIndex] && answerIndex !== question.index) {
                  backgroundColor = 'lightcoral';
                }
              }
              return (
                <div key={answerIndex} style={{ marginBottom: '8px' }}>
                  <Radio
                    value={answerIndex}
                    style={{
                      backgroundColor,
                      fontWeight: 'bold',
                      display: 'block',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    {answer}
                  </Radio>
                </div>
              );
            })}
          </Radio.Group>
        </Card>
      ))}
      <Button type="primary" onClick={handleSubmit} disabled={submitted}>
        Submit
      </Button>
      {submitted && (
        <>
          <Title level={3} style={{ marginTop: "20px" }}>
            Your Score: {score} / {quizData.length}
          </Title>
          <Button type="default" onClick={handleRetake} style={{ marginTop: "10px" }}>
            Retake Quiz
          </Button>
        </>
      )}
    </div>
  );
};

export default Quiz;
