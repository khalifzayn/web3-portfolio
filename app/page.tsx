'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_text",
        "type": "string"
      }
    ],
    "name": "addTodo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "toggleComplete",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyTodos",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "text",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "completed",
            "type": "bool"
          }
        ],
        "internalType": "struct Web3Todo.Todo[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "userTodos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "text",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "completed",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0x7F1758fdCA608f1C16845e209C93883F491342A2";

export default function Web3TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Connect Wallet
  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      
      setAccount(accounts[0]);

      const todoContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      setContract(todoContract);
      
      loadTodos(todoContract);
    } catch (err) {
      console.error(err);
      alert("Gagal connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // Load todos dari smart contract
  const loadTodos = async (todoContract: any) => {
    if (!todoContract) return;
    setLoading(true);
    try {
      const myTodos = await todoContract.getMyTodos();
      const formattedTodos = myTodos.map((todo: any) => ({
        id: Number(todo.id),
        text: todo.text,
        completed: todo.completed
      }));
      setTodos(formattedTodos);
    } catch (err) {
      console.error("Gagal load todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Todo ke Blockchain
  const addTodo = async () => {
    if (!inputValue.trim() || !contract) return;
    
    try {
      const tx = await contract.addTodo(inputValue.trim());
      await tx.wait();
      setInputValue('');
      loadTodos(contract); // refresh list
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan todo ke blockchain");
    }
  };

  // Toggle Complete
  const toggleComplete = async (id: number) => {
    if (!contract) return;
    try {
      const tx = await contract.toggleComplete(id);
      await tx.wait();
      loadTodos(contract);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800">✨ Web3 Todo</h1>
            <p className="text-gray-600">Tugas tersimpan di Blockchain</p>
          </div>
          {account ? (
            <div className="text-right text-sm">
              ✅ {account.slice(0,6)}...{account.slice(-4)}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-purple-600 text-white px-6 py-3 rounded-2xl"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>

        <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl shadow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Apa yang akan kamu kerjakan hari ini?"
            className="flex-1 px-5 py-4 text-lg border-0 focus:outline-none rounded-xl"
          />
          <button
            onClick={addTodo}
            disabled={!contract}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl disabled:bg-gray-400"
          >
            Tambah ke Blockchain
          </button>
        </div>

        {loading && <p className="text-center">Loading todos dari blockchain...</p>}

        <div className="space-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-6 h-6 accent-indigo-600"
              />
              <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}