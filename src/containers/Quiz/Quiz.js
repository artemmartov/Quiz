import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

export default class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Красный", id: 3 },
          { text: "Зеленый", id: 4 }
        ]
      },
      {
        question: "Какого цвета солнце?",
        rightAnswerId: 1,
        id: 2,
        answers: [
          { text: "Желтый", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Красный", id: 3 },
          { text: "Зеленый", id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    let question = this.state.quiz[this.state.activeQuestion];
    let results = this.state.results;

    if (question.rightAnswerId === answerId) {
		if (!results[question.id]){
			results[question.id] = 'success'
		}
      this.setState({
		answerState: { [answerId]: "success" },
		results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
		answerState: { [answerId]: "error" },
		results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onRetryHandler = () => {
	  console.log(665656565);
	  
	this.setState({
		activeQuestion: 0,
		answerState: null,
		isFinished: false
	})
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz 
			results={this.state.results}
			quiz={this.state.quiz}
			onRetry={this.onRetryHandler}
			/>
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.quiz[this.state.activeQuestion].id}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
