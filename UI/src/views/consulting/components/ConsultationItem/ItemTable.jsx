const ItemTable = ({ items, searchTerm, currentPage, itemsPerPage, openEditModal }) => {
    const filteredItems = items.filter((item) =>
      searchTerm && item.conItems ? item.conItems.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );
  
    // 페이지에 맞는 아이템들을 가져옵니다.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
    return (
      <div>
       <table className="item-table">
      <thead className="table-header">
            <tr>
              <th>항목 코드</th>
              <th>상담 항목</th>
              <th>사용 여부</th>
              <th>수정</th>
            </tr>
          </thead>
          <tbody>
            {/* 현재 페이지에 표시할 아이템들을 매핑합니다. */}
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.conItemsID}</td>
                <td>{item.conItems}</td>
                <td>{item.use}</td>
                <td>
                <button className="editButton" onClick={() => openEditModal(item)}>
                수정
              </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ItemTable;
  