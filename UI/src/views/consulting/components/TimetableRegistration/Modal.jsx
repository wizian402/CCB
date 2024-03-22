    import React from "react";

    const Modal = ({ year, month, selectedDate, showModal, closeModal }) => {
      const handleRegisterClick = () => {
        // 서버로 보낼 데이터 준비
        const data = {
          id : localStorage.getItem("loginId"),
          year: year,
          month: month,
          day: selectedDate.getDate(),
          // 선택된 시간대 처리
          // 예: 시간대 1부터 8까지의 선택 여부를 배열에 담음
          timeSlots: Array.from({ length: 9 }, (_, index) => {
            return document.getElementById(`timeSlot${index + 1}`)?.checked || false;
          }),
        };

        console.log(data);
        // 서버 URL 설정
        const url = `/cbb/consulting/insertSchedule`; // 실제 서버 URL로 변경해야 함

        // fetch API를 사용하여 POST 요청 보내기
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // 서버 응답 처리
            console.log("서버 응답:", data);
            if (data === -1) {
              alert("이미 등록된 시간입니다.");
              window.location.reload();
            } else if (data >= 1) {
              alert("등록되었습니다.");
              window.location.reload(); 
            } else {
              alert("다시 시도해주세요.");
              window.location.reload(); 
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
            // 에러 처리
          });
      };

      return (
        showModal && (
          <div className="Calendermodal">
            <div className="modal-content">
              <h2>
                {`${year}년 ${month}월 ${selectedDate.getDate()}일`}
                <br />
                시간표 등록
              </h2>
              <div className="checkboxes">
                {[...Array(9)].map((_, index) => {
                  if (index === 4) return null; // 13시는 제외
                  const startTime = ("0" + (9 + index)).slice(-2) + ":00";
                  const endTime = ("0" + (9 + index)).slice(-2) + ":50";
                  return (
                    <div key={index} className="checkbox">
                      <label htmlFor={`timeSlot${index + 1}`}>{`${startTime} ~ ${endTime}`}</label>
                      <input type="checkbox" id={`timeSlot${index + 1}`} name={`timeSlot${index + 1}`} />
                    </div>
                  );
                })}
              </div>
              <div className="button-container">
                <button onClick={handleRegisterClick} className="register-button">
                  등록
                </button>
                <button onClick={closeModal} className="close-button">
                  닫기
                </button>
              </div>
            </div>
          </div>
        )
      );
    };

    export default Modal;
