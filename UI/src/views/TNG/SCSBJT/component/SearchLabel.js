import React from 'react';
import { CFormLabel, CFormInput, CCol, CForm } from '@coreui/react';

const SearchLabel = () => {
  return (
    <CForm>
      <div className="mb-3 row align-items-center">
        <CCol sm="3">
          <CFormInput id="exampleFormControlInput1" placeholder="이름을 입력하세요" />
        </CCol>
      </div>
    </CForm>
  );
};

export default SearchLabel;
