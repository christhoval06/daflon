import DATA from '../assets/questions';
import  {getRandomFromData} from '../utils/array';

class API {

	static  questions = DATA.questions;

	static getQuestion(){

	}

	static  getQuestionBy(category, type){
		const questions = API.questions.filter((question) => question.category.includes(category) && question.type.includes(type));
		return getRandomFromData(questions);
	}
}

export {API};
