import { WordData } from '../interfaces/interfaces';
import getRandomIntInclusive from './getRandomNumber';

export default function getAnotherWord(arr: Array<WordData>, excludeIndex: number) {
    const indexArr = arr.map((word, index) => index).filter((index) => index !== excludeIndex);
    const randomIndex = indexArr[getRandomIntInclusive(0, indexArr.length - 1)];
    return arr[randomIndex];
}
