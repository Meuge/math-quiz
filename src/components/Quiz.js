import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.result}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <div
      className="container"
      component="div"
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </div>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
