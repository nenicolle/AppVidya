import React from 'react';
import styled from 'styled-components/native';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  iconColor?: string;
  placeholderTextColor?: string;
  backgroundColor?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar...',
  value,
  onChangeText,
  iconColor = '#888',
  placeholderTextColor = '#aaa',
  backgroundColor = '#f9f9f9',
}) => {
  return (
    <SearchContainer backgroundColor={backgroundColor}>
      <Search size={24} color={iconColor} />
      <SearchInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
      />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.View<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  padding: 0px 14px;
  height: 40px;
  margin-bottom: 16px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #333;
  font-size: 16px;
  margin-left: 8px;
`;
