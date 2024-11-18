// import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import { listCategoriesAPI } from "../../services/category/categoryService";
import { listTransactionsAPI, deleteTransactionAPI } from "../../services/transactions/transactionService";
import "./TransactionList.css";
import { useState } from "react";

const TransactionList = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { data: categoriesData } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { data: transactions, refetch } = useQuery({
    queryFn: () => listTransactionsAPI(filters),
    queryKey: ["list-transactions", filters],
  });

  console.log("Fetched transactions:", transactions);

  const { mutateAsync } = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => refetch(), // refetch transactions after delete
  });

  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="transaction-container">
      <div className="filter-grid">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          value={filters.endDate}
          onChange={handleFilterChange}
          type="date"
          name="endDate"
          className="filter-input"
        />
        <div className="relative">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="filter-select filter-types-tran1"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="relative">
          <select
            value={filters.category}
            onChange={handleFilterChange}
            name="category"
            className="filter-select filter-types-tran2"
          >
            <option value="All">All Categories</option>
            <option value="Uncategorized">Uncategorized</option>
            {categoriesData?.map((category) => (
              <option key={category?._id} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="transaction-list">
        <h3 className="transaction-title">Filtered Transactions</h3>
        <ul className="transaction-items">
          {transactions?.map((transaction) => (
            <li
              key={transaction._id}
              className={`transaction-item ${
                transaction.type === "income" ? "income" : "expense"
              }`}
            >
              <div>
                <span className="transaction-date">
                {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span className="transaction-type">
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
                <span className="transaction-category">
                  {transaction.category?.name} - &#8377;
                  {transaction.amount.toLocaleString()}
                </span>
                <span className="transaction-description">
                  {transaction.description}
                </span>
              </div>
              <div className="transaction-actions">
                <Link to={`/update-transaction/${transaction._id}`}>
                  <button className="edit-button">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
