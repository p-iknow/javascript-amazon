import InputView from './src/js/InputView.js';
import ResultView from './src/js/ResultView.js';
import ResultViewRenderer from './src/js/ResultViewRenderer.js';
import Controller from './src/js/Controller.js';
import Model from './src/js/Model.js';

const inputView = new InputView();
const resultView = new ResultView(ResultViewRenderer);
const model = new Model();
const controller = new Controller(model, inputView, resultView);