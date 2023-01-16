import React, { useEffect, useState } from "react";
import ImageSlider from "../imageSlider/ImageSlider";
import "./mess_details.scss";
import { useSelector } from "react-redux";
import axios from "axios";

const MessDetails = () => {
  const [formActive, setFormActive] = useState(false);
  const messId = useSelector((state) => state.setCommonMessId);
  const [mess, setMess] = useState("");
  const [plans, setPlans] = useState("");
  const [allReviews, setAllReviews] = useState([]);

  /* This states for review sections  */
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // fetching mess details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/user/mess/${messId}`
        );
        const resPlans = await axios.get(
          `http://localhost:8800/api/user/mess/plans/${messId}`
        );

        setMess(res.data);
        setPlans(resPlans.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // fetching Review  details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resReview = await axios.get(
          `http://localhost:8800/api/home/reviews/${messId}`
        );
        setAllReviews(resReview.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // adding review to DB
  const reviewSubmit = async (e) => {
    try {
      const res = await axios.post(`http://localhost:8800/api/home/review`, {
        email,
        review,
        messId,
        rating,
      });
    } catch (error) {
      console.log(error);
      if (error) {
        alert("Enter valid details or you are not customer of this mess.");
      }
    }
  };

  // Mess Images
  const urls = [
    mess && mess.photos[0],
    mess && mess.photos[1],
    mess && mess.photos[2],
  ];

  return (
    <div className="messDetailsContainer">
      {/* Navbar */}
      <nav>
        <h1>MessyFeed</h1>
      </nav>

      {/* Mess Topbar */}
      <div className="name-rating">
        <h2>{mess.name}</h2>
        <p>rating</p>
      </div>

      {/* Mess Images */}
      <div className="images">
        <ImageSlider urls={mess && urls} />
      </div>

      {/* Mess Info */}
      <div className="mess-info">
        <div className="mess">
          <h3>Address</h3>
          <p>{`${mess.address}, ${mess.pincode}`} </p>
          <h3>Contact Details</h3>
          <p>
            {mess.contactNo}
            <br />
            {mess.email}
          </p>
        </div>
        <div className="plans">
          <h3>Plans</h3>
          {plans &&
            plans.map((plan) => (
              <div className="plan">
                <h4>{plan.name}</h4>
                <p className="cost">{`Cost: ${plan.planCost} Rs`}</p>
                <p className="meal">{`Total Meals: ${plan.mealCount}`}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Rating System */}
      <div className="rating-system-form">
        <h2>All Ratings By Mess Customers</h2>
        <button className="givebtn" onClick={() => setFormActive(!formActive)}>
          Give Rating
        </button>
        {formActive && (
          <div className="ratingform">
            <div className="email-star">
              <input
                type="text"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <textarea
              name="rating"
              cols="50"
              rows="6"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button onClick={reviewSubmit}>Submit</button>
          </div>
        )}
      </div>

      {/* List Of All Ratings */}
      <div className="all-reviews">
        {allReviews &&
          allReviews.map((rev) => (
            <div className="review">
              <p>{rev.review}</p>
              <div className="rating">
                <p>{rev.rating}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="footer">
        <p>© Copyright 2022, All Rights Reserved | MessyFeed </p>
      </div>
    </div>
  );
};

export default MessDetails;
