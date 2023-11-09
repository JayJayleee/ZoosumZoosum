import React, {useEffect} from 'react'
import { SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'

interface singleProps {
  dataList: Array<string>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  maxHeight: number;
  placeholder: string;
};

interface InputSingleType {
  key: string;
  value: string;
};

export const SingleSelect = ({dataList, setSelected, maxHeight, placeholder}: singleProps) => {

  // 전달받은 데이터 리스트를 하나씩 대괄호로 리스트화하기 위해 빈 리스트 생성
  const data:Array<Object> = []
  let tmp:InputSingleType = {key: "", value: ""}


  // 전달받은 데이터를 하나씩 순회하면서 리스트에 넣기
  dataList.map((content) => {
    tmp = {key: content, value: content}
    data.push(tmp)
  })

  return (
    <SelectList
     setSelected={(val:string) => setSelected(val)} 
     data={data} 
     maxHeight={maxHeight} 
     search={false}
     boxStyles={{width: '80%', borderColor:"#6B4EFF", borderWidth: 2}} 
     inputStyles={{width: '100%', fontSize: 18}}
     dropdownStyles={{borderColor:"#6B4EFF", borderWidth: 2, width: 'auto'}}
     dropdownTextStyles={{fontSize: 18, width:'80%'}}
     fontFamily='NPSfont_regular'
     placeholder={placeholder}
     />
  )
}