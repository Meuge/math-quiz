import React, { Component } from 'react';
import "simple.string.format";
import quizQuestions from './questions/allQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import Button from './components/Button';
import './App.css';


const quizzes = [
  { id: 1, title: 'Elemental' },
  { id: 2, title: 'Intermedio' },
  { id: 3, title: 'Avanzado' },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:'',
      nameUser:'',
    };
    
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleCategorySelected = this.handleCategorySelected.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.backToInit= this.backToInit.bind(this);

    this.currentPage = 'home';
    this.pages = this.generatePages();
    
  
  }


  generatePages(){
     return {
      'home': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Math Quiz</h1>
          </div>
          <h1 className="titleWithEffect"> Empecemos a Jugar!</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <label>
            <input type="text" placeholder="Nombre" name='name' value={this.state.nameUser} onChange={(e) => {this.setState({nameUser: e.target.value })}} />
            </label>
            <Button onClick={this.handleSubmit} > Ingresar!</Button>
          </form>
        </div>
      ),
      'levelSelection': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Math Quiz</h1>
          </div>
          <div>
            <h1 className="titleWithEffect"> Elige Tu Nivel</h1>
              {quizzes.map((item, index) => {
                  return (
                    <Button 
                      key={item.id}
                      onClick={this.handleCategorySelected}
                      id={item.id}
                      >
                      {item.title}
                    </Button>  
                  )
                })
              }
          </div>
        </div>
      ),
      'quest':(
      <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Math Quiz</h1>
      </div>
        {this.renderQuiz()}
    </div> ),
      'obtainResults': (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Math Quiz</h1>
          </div>
          <center>{this.renderResult()}</center>
          <Button onClick={this.backToInit}>Volver A Jugar!</Button> </div>
      ),
    }
  }



  componentDidMount() {
    
    const mixedAnswers = quizQuestions.map(question =>
      this.mixQuestions(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: mixedAnswers[0]
    });
  }

  mixQuestions(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 500);
    } else {
      setTimeout(() => this.setResults(this.obtainResults()), 500);
    }
    
  }

//     handleCategorySelected(event) {
//     this.setState({ categorySelected: quizzes[event.currentTarget.id-1].title }, () => 
//     console.log(this.state.categorySelected));
// }

  handleCategorySelected(event) {
    this.setState({categorySelected: quizzes[event.currentTarget.id-1].title});
    this.currentPage='quest';
  }


  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersQuantity: {
        ...state.answersQuantity,
        [answer]: (state.answersQuantity[answer] || 0) + 1
      },
      answer: answer,
     
      
    }));
    //console.log(answer);
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: '',
    });
  }

  obtainResults() {
    const answersQuantity = this.state.answersQuantity;
    return ('Haz logrado responder {0} preguntas correctamente de {1}'.format( answersQuantity["correct"]?answersQuantity["correct"]:0, quizQuestions.length));
  }

  setResults(result) {
    this.setState({ result: result })
}

  renderQuiz() {
    if (this.state.result){
      this.currentPage='obtainResults';
    }

    return (
      <div className="App">
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
      </div>
    )
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }


  backToInit(event){
    this.currentPage='levelSelection';
    event.preventDefault();
    this.setState({counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersQuantity: {},
      result: '',
      categorySelected:'',
      nameUser:''});
    this.componentDidMount();
      
  }
  handleSubmit(event){
    this.currentPage='levelSelection';
    this.setState({nameUser: event.target.value});
    event.preventDefault();
  };

  render() {
    this.pages = this.generatePages();
    return this.pages[this.currentPage];
}
}

export default App;
