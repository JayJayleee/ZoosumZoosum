import React, {useEffect} from 'react'
import { SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'

interface singleProps {
  dataList: Array<string>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

interface InputSingleType {
  key: string;
  value: string;
};

export const SingleSelect = ({dataList, setSelected}: singleProps) => {

  // 전달받은 데이터 리스트를 하나씩 대괄호로 리스트화하기 위해 빈 리스트 생성
  const data:Array<Object> = []
  let tmp:InputSingleType = {key: "", value: ""}

  // 전달받은 데이터를 하나씩 순회하면서 리스트에 넣기
  dataList.map((content) => {
    tmp = {key: content, value: content}
    data.push(tmp)
  })

  return (
    <SelectList setSelected={(val:string) => setSelected(val)} data={data} />
  )
}