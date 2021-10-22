import styled from 'styled-components';

const Table = styled.table`
margin: 10px auto;
  border-collapse: collapse;
  border: 3px solid #ddd;`;
const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;`;
const Td = styled.td`
  border: 1px solid #ddd;
  padding: 12px;`
const Tr = styled.tr`&:hover{background-color: #ddd;}`;
const Ul = styled.ul`list-style-type:circle`;
const Li = styled.li`font-weight:bold;color:#4caf50`;
export {Td,Tr,Table,Th,Ul,Li};