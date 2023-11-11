import { windowHeight } from '@/constants/styles';
import React, {useEffect} from 'react'
import { StyleSheet } from 'react-native';
import { SelectList, MultipleSelectList }from 'react-native-dropdown-select-list'

interface singleProps {
  dataList: Array<string>;
  setSelected: (e: string) => void | React.Dispatch<React.SetStateAction<string>>;
  maxHeight?: number | undefined;
  placeholder?: string;
  defalut?: string;
  boxStyle?: 'defaultbox' | 'typebox';
  listStyle?: 'defaultlist' | 'typelist'
};

interface InputSingleType {
  key: string;
  value: string;
};

export const SingleSelect = ({
    dataList, 
    setSelected, 
    maxHeight = undefined, 
    placeholder, 
    defalut = undefined,
    boxStyle = 'defaultbox',
    listStyle = 'defaultlist'
  }: singleProps) => {

  let variant;
  let variantInput;
  let variantStyle;
  let variantText;

  switch (boxStyle) {
    case 'defaultbox':
      variant = style.default;
      variantInput = style.defaultInput;
      break;
    case 'typebox':
      variant = style.type;
      variantInput = style.typeInput;
      break;
  }

  switch (listStyle) {
    case 'defaultlist':
      variantStyle = style.defaultlist;
      variantText = style.defaultText;
      break;
    case 'typelist':
      variantStyle = style.typelist;
      variantText = style.typeText;
      break;
  }

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
     maxHeight={maxHeight? maxHeight : undefined} 
     search={false}
     boxStyles={variant} 
     inputStyles={variantInput}
     dropdownStyles={variantStyle}
     dropdownTextStyles={variantText}
     fontFamily='NPSfont_regular'
     placeholder={placeholder? placeholder : undefined}
     defaultOption={defalut? {key: defalut, value: defalut} : undefined}
     />
  )
}

const style = StyleSheet.create({
  default: {
    width: '80%', 
    borderColor:"#6B4EFF", 
    borderWidth: 2,
  }, 
  type: {
    width: '45%', 
    backgroundColor: '#A5DCA0',
    borderColor: '#359608',
  },
  defaultInput: {
    width: '100%', 
    fontSize: 18
  }, 
  typeInput: {
    width: '100%', 
    fontSize: 17,
    fontFamily: 'NPSfont_bold'
  },
  defaultlist: {
    borderColor:"#6B4EFF", 
    borderWidth: 2, 
    width: 'auto'
  }, 
  typelist: {
    backgroundColor: '#A5DCA0',
    borderColor: '#359608',
    borderWidth: 2, 
    width: 'auto',
    zIndex: 100,
    height: windowHeight * 0.15,
  },
  defaultText: {
    fontSize: 18, 
    width:'80%',
  }, 
  typeText: {
    fontSize: 17, 
    width:'100%',
  },
})