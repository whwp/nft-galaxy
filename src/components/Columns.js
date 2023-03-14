import { SelectColumnFilter } from "./Filters";

export const COLUMNS = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "",
    accessor: "thumbnail",
    disableFilters: true,
  },
  {
    Header: "Token Id",
    accessor: "tokenId",
  },
  {
    Header: "Collection Name",
    accessor: "collectionName",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "Contract Address",
    accessor: "contractAddress",
  },
  {
    Header: "Token Type",
    accessor: "tokenType",
    Filter: SelectColumnFilter,
    filter: "equals",
  },
  {
    Header: "Opensea Floor Price",
    accessor: "openseaFloorPrice",
  },
];
