import React from 'react';
import { CInputGroup, CFormInput, CButton } from '@coreui/react';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearchButtonClick }) => {
  return (
    <CInputGroup className="mb-3">
      <CFormInput
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', height: '40px' }}
      />
      <CButton type="button" color="secondary" variant="outline" onClick={handleSearchButtonClick}>
        검색
      </CButton>
    </CInputGroup>
  );
};

export default SearchBar;







// import React, { useEffect } from 'react';
// import { CInputGroup, CFormInput, CButton } from '@coreui/react';

// const SearchBar = ({ data, setData, searchTerm, setSearchTerm }) => {
//   useEffect(() => {
//     filterData();
//   }, [searchTerm]);

//   const filterData = () => {
//     const filtered = data.filter(item => {
//       return item.pbancName.toLowerCase().includes(searchTerm.toLowerCase());
//     });
//     setData(filtered);
//   };

//   const handleSearchButtonClick = () => {
//     filterData();
//   };

//   return (
//     <CInputGroup className="mb-3">
//       <CFormInput
//         type="text"
//         placeholder="검색어를 입력하세요."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ width: '300px', height: '40px' }}
//       />
//       <CButton type="button" color="secondary" variant="outline" onClick={handleSearchButtonClick}>
//         검색
//       </CButton>
//     </CInputGroup>
//   );
// };

// export default SearchBar;
