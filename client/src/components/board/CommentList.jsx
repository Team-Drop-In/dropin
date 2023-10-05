import styled from "styled-components";
import { COLOR } from "../../styles/theme";
import { FiThumbsUp } from "react-icons/fi";

const CommentList = () => {
  return (
    <Wrap>
      <List>
        <CommentItem>
          <Info>
            <User>
              <Imgbox>
                <img src="http://via.placeholder.com/30x30" alt="" />
              </Imgbox>
              <NameAndTime>
                <span>닉네임</span>
                <p>5시간전</p>
              </NameAndTime>
            </User>
            <span>
              <FiThumbsUp />
              좋아요
            </span>
          </Info>
          <Content>하이</Content>
        </CommentItem>
      </List>
    </Wrap>
  );
};

export default CommentList;

const Wrap = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const List = styled.ul`
  height: fit-content;
`;

const CommentItem = styled.li`
  height: fit-content;
  padding: 8px 8px;
  border-bottom: 1px solid ${COLOR.border_grey};
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  & > span {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: ${COLOR.main_grey};
  }
  svg {
    margin-right: 2px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Imgbox = styled.div`
  width: 30px;
  height: 30px;
  background-color: grey;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 5px;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`;

const NameAndTime = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4px;

  span,
  p {
    color: ${COLOR.main_grey};
  }

  p {
    font-size: 0.7rem;
    margin-top: 4px;
  }
`;

const Content = styled.div`
  min-height: 40px;
  height: fit-content;
  margin-top: 15px;
`;