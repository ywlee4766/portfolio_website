import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
import ModalComp from "../ModalComp";
import ModalPortal from "../ModalPortal";

const AwardCard = ({
  _award,
  isEditable,
  setIsEditing,
  setAwards,
  setAllPage,
  page,
  setPage,
}) => {
  // Modal 관련 State
  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    try {
      const { id, userId } = _award;
      await Api.delete(`awards/${id}`);
      const res = await Api.get(
        "awardlist",
        `${userId}?page=${page}&perPage=3`
      );
      const { total, awards } = res.data;
      if (page > Math.ceil(total / 3)) {
        setPage(page - 1);
      }
      setAllPage(Math.ceil(total / 3));
      setAwards(awards);
      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card.Body>
        {/* award의 수상내용과 상세내용을 출력 */}
        <Row className="align-items-center">
          <Col>
            <span>{_award.award}</span>
            <br />
            <span className="text-muted">{_award.description}</span>
          </Col>
          <Col xs lg="1">
            {/* 각 항목마다 편집 버튼을 생성 */}
            {isEditable && (
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            )}
            {/* 각 항목마다 삭제 버튼을 생성 */}
            {isEditable && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShow(true)}
              >
                삭제
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>

      <ModalPortal>
        {show && (
          <ModalComp
            setShow={setShow}
            show={show}
            title="삭제 확인"
            message="정말로 삭제하시겠습니까?"
            children
          >
            <Button
              variant="danger"
              onClick={() => {
                handleDelete();
              }}
            >
              삭제
            </Button>
          </ModalComp>
        )}
      </ModalPortal>
    </>
  );
};

export default AwardCard;
