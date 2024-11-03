import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ele3 from '../../img/ele3.png';
import grayele2 from '../../img/grayele2.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../../components/Alert/Alert";
import './CategoriesList.css'

const CategoriesList = () => {
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const handleDelete = (id) => {
    mutateAsync(id)
      .then(() => refetch())
      .catch((e) => console.log(e));
  };

  const [active, setActive] = useState(3);

  return (
    <section className='dashboard'>
        <img src={ele3} alt='ele3' className='ele3' />
        <div className='navigations'>
            <TopNav/>
            <Navigation active={active} setActive={setActive}/>
        </div>
        <img src={grayele2} alt='ele3' className='grayele2' />
        <div className="category-container">
            <h2 className="category-title">CATEGORIES</h2>
            {isLoading && <AlertMessage type="loading" message="Loading" />}
            {isError && (
                <AlertMessage type="error" message={error?.response?.data?.message} />
            )}
            <ul className="category-list">
                {data?.map((category) => (
                <li key={category?._id} className="category-item">
                    <div>
                    <span className="category-name">{category?.name}</span>
                    <span
                        className={`category-type ${
                        category.type === "income"
                            ? "income-badge"
                            : "expense-badge"
                        }`}
                    >
                        {category?.type?.charAt(0).toUpperCase() +
                        category?.type?.slice(1)}
                    </span>
                    </div>
                    <div className="action-buttons">
                    <Link to={`/update-category/${category._id}`}>
                        <button className="edit-button">
                        <FaEdit />
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(category?._id)}
                        className="delete-button"
                    >
                        <FaTrash />
                    </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    </section>
  );
};

export default CategoriesList;
