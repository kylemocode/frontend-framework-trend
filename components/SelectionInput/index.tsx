import { FC, ChangeEvent } from 'react';
import Styled from 'styled-components';

import {
  flexBox,
  Direction,
  MainAlignment,
  CrossAlignment,
} from '@/utils/flexbox';

const Wrapper = Styled.div`
  ${flexBox({
    direction: Direction.row,
    mainAlign: MainAlignment.flexStart,
    crossAlign: CrossAlignment.center,
  })};
`;

const Title = Styled.div`
  color: ${props => props.theme.colors.BLACK_025};
`;

const Select = Styled.select`
  width: 300px;
  height: 35px;
  background: ${props => props.theme.colors.WHITE_100};
  color: ${props => props.theme.colors.BLACK_025};
  padding-left: 5px;
  font-size: 14px;
  border: solid 1px ${props => props.theme.colors.BLACK_025};
  margin-left: 10px;
  border-radius: 10px;

  option {
    color: ${props => props.theme.colors.BLACK_025};
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    margin-top: 100px;
  }

  :focus {
    outline: none;
  }
`;

type OptionItem = {
  value: any;
  display: string;
};

interface IProps {
  title: string;
  options: OptionItem[];
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectionInput: FC<IProps> = ({ title, options, onSelect }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Select onChange={onSelect}>
        {options.map(item => {
          return (
            <option key={item.value} value={item.value}>
              {item.display}
            </option>
          );
        })}
      </Select>
    </Wrapper>
  );
};

export default SelectionInput;
