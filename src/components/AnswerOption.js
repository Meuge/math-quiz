import React from 'react';
import PropTypes from 'prop-types';

function AnswerOption(props) {
  var checkCorrectAnswer = props.answer !== '' && props.answerType === 'correct';
  var backgroundColor = props.answer === '' ? 'white' :props.answerType === 'correct' ? 'green': 'red';
  
  return (
    <li className="answerOption" style={{backgroundColor: backgroundColor}}>
      <input
        type="radio"
        className="radioCustomButton"
        name="radioGroup"
        checked={checkCorrectAnswer}
        id={props.answerType}
        value={props.answerType}
        disabled={props.answer}
        onChange={props.onAnswerSelected}
      />
      
      <label className="radioCustomLabel" htmlFor={props.answerType}>
        {props.answerContent}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption;
