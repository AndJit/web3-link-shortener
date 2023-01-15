// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "./Owner.sol";

contract Shortener is Owner{

    bytes8 private https = 0x68747470733A2F2F;
    bytes7 private http = 0x687474703A2F2F;
    string[] private links;

    event Log(address indexed _sender, bytes short, string link);

    function short(string calldata link) external payable returns(bytes memory) {
        require(msg.value == 0.0001 ether, "Saving costs 0.0001\u039E") ;
        require(isLink(link), "Not http or https");
        links.push(link);
        emit Log(msg.sender, cut(links.length), link);
        return cut(links.length);
    }

    function getLink(bytes calldata b) external view returns(string memory) {
        return links[bytesToUint(b) - 1];
    }

    function isLink(string calldata link) private view returns(bool){
        return http == bytes7(bytes(link)) || https == bytes8(bytes(link));
    }

    function cut(uint length) private pure returns(bytes memory b){
        bytes[15] memory converted = [
        abi.encodePacked(bytes4(uint32(length))),
        abi.encodePacked(bytes6(uint48(length))),
        abi.encodePacked(bytes8(uint64(length))),
        abi.encodePacked(bytes10(uint80(length))),
        abi.encodePacked(bytes12(uint96(length))),
        abi.encodePacked(bytes14(uint112(length))),
        abi.encodePacked(bytes16(uint128(length))),
        abi.encodePacked(bytes18(uint144(length))),
        abi.encodePacked(bytes20(uint160(length))),
        abi.encodePacked(bytes22(uint176(length))),
        abi.encodePacked(bytes24(uint192(length))),
        abi.encodePacked(bytes26(uint208(length))),
        abi.encodePacked(bytes28(uint224(length))),
        abi.encodePacked(bytes30(uint240(length))),
        abi.encodePacked(bytes32(uint256(length)))
        ];

        for(uint8 i; i < converted.length; i++ ){
            if(bytesToUint(converted[i]) == length ) return converted[i];
        }
    }

    function bytesToUint(bytes memory b) private pure returns (uint256){
        uint256 number;
        for(uint i=0; i < b.length ;i++){
            number = number + uint(uint8(b[i]))*(2**(8*(b.length-(i+1))));
        }
        return number;
    }

}