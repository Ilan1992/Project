export default function checkWin(arr){
  return arr[0].firstChild.src === arr[1].firstChild.src ? true : false;

}