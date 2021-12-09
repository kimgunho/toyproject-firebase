import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  background-color: gray;
  color: white;
  padding: 5px 10px;
  box-sizing: border-box;
`;

function Button({ title, link }) {
  return (
    <Link to={link}>
      <Btn>{title}</Btn>
    </Link>
  );
}

export default Button;
