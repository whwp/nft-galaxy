import { useState, useEffect, useMemo } from "react";
import { Alchemy, Network } from "alchemy-sdk";

import { COLUMNS } from "./Columns";
import TableContainer from "./TableContainer";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Result({
  address,
  isFirstLoading,
  isValidAddress,
  updateResult,
  setUpdateResult,
}) {
  const [accountNFTs, SetAccountNFTs] = useState([]);
  const [isTableLoading, SetIsTableLoading] = useState([true]);
  const columns = useMemo(() => COLUMNS, []);

  async function getNftsForOwner(owner) {
    try {
      let _nfts = []; //store the complete data of NFTs returned by alchemy SDK, for debug purpose
      let nfts = []; //store the selected data of NFTs returned by alchemy SDK.
      SetIsTableLoading(true);

      // Get the async iterable for the owner's NFTs.
      const nftsIterable = alchemy.nft.getNftsForOwnerIterator(owner);

      // Iterate over the NFTs and add them to the nfts array.
      for await (const nft of nftsIterable) {
        _nfts.push(nft);
        nfts.push({
          title: nft["title"],
          thumbnail:
            nft["media"].length > 0 &&
            nft["media"][0].hasOwnProperty("thumbnail")
              ? nft["media"][0]["thumbnail"]
              : null,
          tokenId: nft["tokenId"],
          collectionName: nft["contract"]["name"],
          contractAddress: nft["contract"]["address"],
          tokenType: nft["contract"]["tokenType"],
          openseaFloorPrice: nft["contract"]["openSea"]["floorPrice"],
        });
      }
      SetIsTableLoading(false);

      // Log the NFTs.
      //console.log("got nft: ");
      //console.log(_nfts);
      //console.log(nfts);
      SetAccountNFTs(nfts);
    } catch (error) {
      console.log(error);
      SetAccountNFTs([]);
    }
  }

  useEffect(() => {
    if (isFirstLoading || !updateResult) {
      return;
    }
    getNftsForOwner(address);
    setUpdateResult(false);
  }, [updateResult]);

  return (
    <div>
      <br />
      {!isFirstLoading && !isTableLoading ? (
        <div className="text-left">
          Account {address} has {accountNFTs.length} NFTs
        </div>
      ) : (
        <br />
      )}
      <TableContainer
        columns={columns}
        data={accountNFTs}
        isFirstLoading={isFirstLoading}
        isTableLoading={isTableLoading}
        isValidAddress={isValidAddress}
      />
    </div>
  );
}
