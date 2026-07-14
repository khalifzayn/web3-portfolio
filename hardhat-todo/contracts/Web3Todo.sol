 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Web3Todo {
    struct Todo {
        uint id;
        string text;
        bool completed;
    }

    mapping(address => Todo[]) public userTodos;

    function addTodo(string memory _text) public {
        require(bytes(_text).length > 0, "Text cannot be empty");
        uint newId = userTodos[msg.sender].length;
        userTodos[msg.sender].push(Todo(newId, _text, false));
    }

    function toggleComplete(uint _id) public {
        require(_id < userTodos[msg.sender].length, "Todo not found");
        userTodos[msg.sender][_id].completed = !userTodos[msg.sender][_id].completed;
    }

    function getMyTodos() public view returns (Todo[] memory) {
        return userTodos[msg.sender];
    }
}