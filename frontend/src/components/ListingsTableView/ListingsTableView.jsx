import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiSolidEdit } from 'react-icons/bi'
import EditModal from '../EditModal/EditModal'
import styles from './ListingsTableView.module.css'
import { useNavigate } from 'react-router-dom'

const ListingsTableView = ({listingsData,locationFilter,priceRangeFilter,sortBy}) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  let itemsPerPage = 10;
  let displayData = applyFilters(filteredData, locationFilter, priceRangeFilter, sortBy);
  const totalPages = Math.ceil(displayData.length/itemsPerPage)
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  const isAllSelected = selectedRows.length === itemsPerPage;
  const navigate = useNavigate();

  // Edit functions
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  }

  const handleEditSave = (editedItem) => {
    const updatedData = [...filteredData];

    const indexToBeEdited = updatedData.findIndex(item => item.property_id === editedItem.property_id);

    if(indexToBeEdited !== -1){
      updatedData[indexToBeEdited] = editedItem
      setFilteredData(updatedData)
    }
    setEditingItem(null);
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  }

  // Delete handlers
  const handleDelete = (id) => {
    const updatedData = filteredData.filter(ele => ele.property_id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length/itemsPerPage);
    if(currentPage > updatedTotalPages)
      setCurrentPage(updatedTotalPages);
    setFilteredData(updatedData);
    setSelectedRows([]);
  }

  const handleDeleteAllSelected = () => {
    if(selectedRows.length === 0) return;
    const updatedData = filteredData.filter(ele => !selectedRows.includes(ele.property_id))
    const updatedTotalPages = Math.ceil(updatedData.length/itemsPerPage);
    if(currentPage > updatedTotalPages)
      setCurrentPage(updatedTotalPages)
    setFilteredData(updatedData);
    setSelectedRows([]);
  }

  // Checkbox handlers
  const handleSelectAll = (ev, displayData) => {
    if(ev.target.checked){
      const startIndex = (currentPage-1)*itemsPerPage;
      let rowsSelected = [];
      for(let i=startIndex; i<startIndex +itemsPerPage; i++){
        if(i<displayData.length)
          rowsSelected.push(displayData[i].property_id);
        else
          rowsSelected.push(Math.random())
      }
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  }

  const handleRowCheckboxChange = (ev, id) => {
    if(ev.target.checked){
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(item => item !== id))
    }
  }

  // Pagination Handlers
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
    setSelectedRows([]);
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
    setSelectedRows([]);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    setSelectedRows([]);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
    setSelectedRows([]);
  }

  // Normal Methods

  function applyFilters(filteredData, location, priceRange, sortBy) {
    let updatedData = [...filteredData];
    if(location.length){
      updatedData = updatedData.filter(listing => location.includes(listing.city))
    }

    if(priceRange.length){
      updatedData = updatedData.filter(listing => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split('-')[0];
          let high = rangeEntry.split('-')[1];
          if(Number(listing.price) >= low && Number(listing.price) <= high)
            found = true
        });
        return found
      })
    }

    if(sortBy === 'price'){
      updatedData.sort((firstListing, secondListing) => firstListing.price - secondListing.price)
    } else if(sortBy === 'date'){
      updatedData.sort((firstListing, secondListing) => new Date(firstListing.listing_date) - new Date(secondListing.listing_date))
    }
    return updatedData
  }

  useEffect(() => {
    setFilteredData(listingsData);
  },[listingsData])

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter])

  const getPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for(let currPage=1; currPage <= totalPages;currPage++)
      pageNumbers.push(currPage)
    return pageNumbers
  }

  const pageNumbers = getPageNumbers(totalPages);

  return (
    <div className={styles.listingsTableContainer}>
      <table>
        <thead>
          <tr>
            <th>
              <input type='checkbox' checked={isAllSelected} onChange={(ev) => handleSelectAll(ev, displayData)} />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((items, index)=> (
            <tr className={`tableRow`}>
              <td><input type='checkbox' checked={selectedRows.includes(items.property_id)} onChange={(ev) => handleRowCheckboxChange(ev, items.property_id)} /></td>
              <td className={styles.propertyName} onClick={() => navigate(`/detail/${items.property_id}`)}>{items.property_name}</td>
              <td>Rs. {items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className={styles.actionItems}>
                <AiFillDelete onClick={() => handleDelete(items.property_id)} /> 
                <BiSolidEdit onClick={() => handleEdit(items)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.tableFooter}>
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className={styles.paginationContainer}>
          <span>Page {totalPages < 1 ? 0 : currentPage} of {totalPages}</span>
          <div className={styles.pagination}>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            {pageNumbers.map(page => (
              <button onClick={() => handlePageClick(page)}>{page}</button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            <button onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal item={editingItem} onSave={handleEditSave} onClose={handleCloseEditModal} />
      )}
    </div>
  )
}

export default ListingsTableView