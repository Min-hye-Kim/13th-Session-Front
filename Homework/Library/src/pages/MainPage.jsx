import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

// components
import TopBar from "../components/TopBar";
import Book from "../components/Book";

const MainPage = () => {
  // 책 목록을 저장할 state
  const [bookList, setBookList] = useState([]);
  // 렌더링 상태를 나타낼 state
  const [render, setRender] = useState(1);

  const BASE_URL = "https://likelionbookapi.pythonanywhere.com/";

  
//――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

  // 문제 1) 로컬 스토리지에서 token 값을 받아와 token 변수에 할당하기
  const token = localStorage.getItem("token");

  // 문제 2) axios를 사용하여 책 목록을 받아오는 API를 호출하는 getBookList 함수를 작성하기.
  //        (이때 받아온 데이터는 setBookList를 사용하여 bookList에 저장해주세요.)

  const getBookList = async () => {
    try {
  const response = await axios.get(`${BASE_URL}book/`, {
    headers: {
//❓ 아니 근데 다들 헤더 추가하셨는지?? 여쭤보기
      Authorization: token && `Bearer ${token}`,
    },
  });      
  

      console.log("Book list",response.data);
      setBookList(response.data.data);
//❗ 그리고 console.log 아니라 console.error 였다
//❓ 이거 에러고치느라 한참 걸림
//   처음 401은 뭐였을까      
    } catch (error) {
      console.error("Error : 책 목목록 불러오기 실패", error);
    }
  };

  // ↓ 컴포넌트가 마운트될 때 getBookList 함수를 호출하는 코드
  useEffect(() => {
    getBookList();
  }, [render]);

  return (
    <>
      <Wrapper>
        <Container>
          <TopBar />
          <BookList>
            {bookList.map((book) => (
              <Book
                key={book.id}
                book={book}
                render={render}
                setRender={setRender}
              />
            ))}
          </BookList>
        </Container>
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookList = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
`;
