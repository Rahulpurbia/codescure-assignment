// src/App.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectPeople,
  selectPeopleStatus,
  selectPeopleError,
  fetchPeopleFulfilled,
  fetchPeoplePending,
  fetchPeopleRejected,
} from "../../features/peopleSlice";
import { Input } from "@mui/material";
import "./style.css";
import DataTable from "../../Components/DataTable/DataTable";
import { Button } from "@mui/material";
import useDebounce from "../../Utils/CustomHooks/useDebounce";

const Homepage = () => {
  const dispatch = useDispatch();
  const people = useSelector(selectPeople);
  const status = useSelector(selectPeopleStatus);
  const error = useSelector(selectPeopleError);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 1500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchPeoplePending());

        const data = await fetchPeople(currentPage, debouncedSearchValue);

        dispatch(fetchPeopleFulfilled(data));
      } catch (error) {
        dispatch(fetchPeopleRejected(error.message));
      }
    };

    fetchData();
  }, [dispatch, currentPage, debouncedSearchValue]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    currentPage < pageCount && setCurrentPage((prevPage) => prevPage + 1);
  };

  const cancelTokenSource = axios.CancelToken.source();

  const fetchPeople = async (page, searchQuery = "") => {
    cancelTokenSource.cancel("Operation canceled by the user.");
    const newCancelTokenSource = axios.CancelToken.source();

    try {
      const apiUrl = `https://swapi.dev/api/people/?page=${page}&search=${searchQuery}`;

      const response = await axios.get(apiUrl, {
        cancelToken: newCancelTokenSource.token,
      });

      const data = response.data;
      const pages = Math.ceil(data.count / 10);
      setPageCount(pages);

      return data.results;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled
        console.log("Request canceled:", error.message);
      } else {
        // Actual error
        throw error;
      }
    }
  };

  const cancelPreviousRequest = () => {
    cancelTokenSource.cancel("Operation canceled by the user.");
  };

  return (
    <div>
      {status === "failed" && (
        <div className="text-center mt-20 bold center">
          <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
          &nbsp; {error}
        </div>
      )}
      {(status === "succeeded" || status === "loading") && (
        <div className=" d-flex justify-content-center flex-column align-items-center">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            type="text"
            className="w-100 search-bar mb-20"
          />
          <DataTable data={people} status={status} currentPage={currentPage} />
        </div>
      )}
      {status === "succeeded" && (
        <>
          (
          {pageCount > 1 && (
            <div className="text-center gap-10 d-flex justify-content-center mt-20 mb-20">
              <Button
                disabled={currentPage === 1}
                variant={"contained"}
                onClick={handlePreviousPage}
              >
                Prev
              </Button>
              {Array.from({ length: pageCount }, (_, index) => (
                <Button
                  key={index + 1}
                  variant={currentPage === index + 1 ? "contained" : "outlined"}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                disabled={currentPage === pageCount}
                variant={"contained"}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          )}
          )
        </>
      )}
    </div>
  );
};

export default Homepage;
