import React, { useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { Button, Modal, Form } from 'react-bootstrap';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Breadcrumb } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { fetchUsers, updateUser, selectUsers, addUser } from '../../../store/slices/users-slice';
import cogoToast from 'cogo-toast';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [size] = React.useState(5);
  const [orderBy, setOrderBy] = React.useState('-updateAt');
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ row }) => {
          const rowIndex = row.index + 1 + currentPage * size;
          return <div>{rowIndex}</div>;
        },
      },
      {
        Header: 'Name',
        accessor: 'displayName',
      },
      {
        Header: 'Email',
        accessor: 'email',
        sortType: 'basic',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        sortType: 'basic',
      },
      {
        Header: 'Date Joined',
        accessor: 'createAt',
        sortType: 'basic',
        Cell: ({ value }) => {
          return <div>{new Date(value).toISOString()}</div>;
        },
      },
      {
        Header: 'Point',
        accessor: 'point',
        sortType: 'basic',
      },
      {
        Header: 'Status',
        accessor: 'isDeleted',
        sortType: 'basic',
        Cell: ({ value }) => {
          return (
            <div
              style={{
                color: !value ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {!value ? 'ACTIVE' : 'INACTIVE'}
            </div>
          );
        },
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          const isActive = !row.original.isDeleted;
          return (
            <DropdownButton id={`dropdown-button-${row.id}`} title={<i className="fa fa-ellipsis-v"></i>}>
              {isActive ? (
                <Dropdown.Item
                  style={{ color: 'red' }}
                  onClick={() => handleUpdateStatus(false, row.original.Id)}
                >
                  Disable
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  style={{ color: 'green' }}
                  onClick={() => handleUpdateStatus(true, row.original.Id)}
                >
                  Enable
                </Dropdown.Item>
              )}
            </DropdownButton>
          );
        },
        id: 'action',
      },
    ],
    [users]
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } = useTable(
    {
      columns,
      data: users.data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: Math.ceil(users.pagination.total / size),
      manualSortBy: true,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    dispatch(fetchUsers({ currentPage, pageSize: size, searchText, orderBy }));
  }, [currentPage, orderBy]);

  const debouncedFetchUsers = debounce((searchText) => {
    dispatch(fetchUsers({ currentPage, pageSize: size, searchText, orderBy }));
  }, 500);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    debouncedFetchUsers(event.target.value);
  };

  const handleUpdateStatus = (stauts, userId) => {
    const user = users.data.find((user) => user.Id === userId);
    setSelectedUser(user);
    if (stauts === true) {
      cogoToast
        .loading('Enabling user...', {
          position: 'bottom-right',
        })
        .then(() => dispatch(updateUser({ Id: selectedUser.Id, isDeleted: false })))
        .then((res) => {
          if (!res.error)
            cogoToast.info('Successfully edit user', {
              position: 'bottom-right',
              hideAfter: 3,
              onClick: () => console.log('Clicked'),
            });
          else
            cogoToast.error(res.error.message, {
              position: 'bottom-right',
              hideAfter: 3,
              onClick: () => console.log('Clicked'),
            });
        });
    } else {
      setShowDeleteModal(true);
    }
  };

  const handleUpdateStatusSubmit = (event) => {
    event.preventDefault();
    cogoToast
      .loading('Disabling user...', {
        position: 'bottom-right',
      })
      .then(() => dispatch(updateUser({ Id: selectedUser.Id, isDeleted: true })))
      .then((res) => {
        if (!res.error)
          cogoToast.info('Successfully disable user', {
            position: 'bottom-right',
            hideAfter: 3,
            onClick: () => console.log('Clicked'),
          });
        else
          cogoToast.error(res.error.message, {
            position: 'bottom-right',
            hideAfter: 3,
            onClick: () => console.log('Clicked'),
          });
      });
    setShowDeleteModal(false);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="content-wrapper">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Users</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex justify-content-between align-items-center mb-3 w-100">
        <div className="search-box">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search users..." value={searchText} onChange={handleSearchChange} />
        </div>
      </div>
      <table {...getTableProps()} className="table table-bordered table-striped">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={(e) => {
                    column.getSortByToggleProps().onClick(e);
                    setTimeout(() => {
                      if (column.isSorted === true) {
                        if (column.id !== 'id' && column.id !== 'status')
                          setOrderBy(column.isSortedDesc ? `-${column.id}` : column.id);
                        else if (column.id === 'status')
                          setOrderBy(column.isSortedDesc ? '-isDeleted' : 'isDeleted');
                        else setOrderBy(column.isSortedDesc ? '-updateAt' : 'updateAt');
                      } else {
                        setOrderBy('-updateAt');
                      }
                    });
                  }}
                  className={`${column.isSorted ? (column.isSortedDesc ? 'sort-desc' : 'sort-asc') : ''} ${
                    column.id === 'action' ? 'action-column' : ''
                  }`}
                >
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={cell.column.id === 'action' ? 'action-column' : ''}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-wrapper">
        <ReactPaginate
          containerClassName="pagination"
          pageCount={Math.ceil(users.pagination.total / size)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          activeClassName="active"
          previousClassName="page-item"
          nextClassName="page-item"
          pageClassName="page-item"
          breakClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakLinkClassName="page-link"
          disableInitialCallback={true}
        />
      </div>
      <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
        <Form onSubmit={handleUpdateStatusSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Disable User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to disable the user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" type="submit">
              Disable
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default React.memo(Users);
