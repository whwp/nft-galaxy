import React, { Fragment } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";

import { Table, Row, Col, Button, Input } from "reactstrap";
import { ColorRing } from "react-loader-spinner";

import { Filter, DefaultColumnFilter } from "./Filters";

const TableContainer = ({
  columns,
  data,
  renderRowSubComponent,
  isFirstLoading,
  isTableLoading,
  isValidAddress,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,

    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {!isFirstLoading && !isTableLoading && (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      if (cell.column.id === "thumbnail") {
                        return (
                          <td {...cell.getCellProps()}>
                            <img
                              src={cell.value}
                              alt="NA"
                              width="40"
                              height="40"
                            ></img>
                          </td>
                        );
                      } else {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      }
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        )}
      </Table>

      {!isFirstLoading && !isTableLoading && (
        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Col md={3}>
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page {pageIndex + 1} of {pageOptions.length}
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <Input type="select" value={pageSize} onChange={onChangeInSelect}>
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={3}>
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </Col>
        </Row>
      )}

      {!isFirstLoading && isTableLoading && isValidAddress && (
        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div className="w-full h-screen flex items-center justify-center w-50 mx-auto">
            <ColorRing
              visible={true}
              height="200"
              width="200"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </Row>
      )}
    </Fragment>
  );
};

export default TableContainer;
