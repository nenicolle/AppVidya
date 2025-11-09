import React from 'react';
import styled from 'styled-components/native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

export default function Header({ title, showBack = false, onBackPress }: HeaderProps) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) onBackPress();
    else navigation.goBack();
  };

  return (
    <HeaderContainer>
      {showBack && (
        <BackButton onPress={handleBack}>
          <ChevronLeft size={22} color="#000" />
        </BackButton>
      )}
      <HeaderTitle $hasBack={showBack}>{title}</HeaderTitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;

  border-color: #eee;
  background-color: #fff;
`;

const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text<{ $hasBack?: boolean }>`
  flex: 1;
  font-size: 18px;
  font-weight: 700;
  color: #333;
  text-align: ${({ $hasBack }) => ($hasBack ? 'center' : 'center')};
  margin-right: ${({ $hasBack }) => ($hasBack ? '26px' : '0px')};
`;
