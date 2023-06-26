import React from 'react'
import Comment from './Comment';
const ChallengeDiscussionSection = () => {
    const comments = [
      {
        author: "John",
        date: "2022-03-15",
        likes: 10,
        text: "Reversing a string in JavaScript is easy. You can use the built-in `split`, `reverse`, and `join` methods like this: ",
        answers: [
          {
            author: "Jane",
            date: "2022-03-16",
            likes: 3,
            text: "You can also use a `for` loop to iterate over the string characters and build a new reversed string.",
          },
          {
            author: "Bob",
            date: "2022-03-17",
            likes: 3,
            text: "Another option is to use the `reduce` method to create a new string by appending each character from the original string in reverse order.",
          },
          {
            author: "Alice",
            date: "2022-03-18",
            likes: 3,
            text: "Don't forget about the `substring` method, which can also be used to reverse a string in JavaScript.",
          },
        ],
      },
      {
        author: "Sarah",
        date: "2022-03-20",
        likes: 6,
        text: "In C++, you can reverse a string using the `reverse` method from the `algorithm` library like this: ",
        answers: [
          {
            author: "Tom",
            date: "2022-03-21",
            text: "You can also use a `for` loop to swap characters in the string from the beginning and end, until you reach the middle.",
          },
          {
            author: "Karen",
            date: "2022-03-22",
            likes: 2,
            text: "Another option is to create a new string and copy the characters from the original string in reverse order using a `for` loop.",
          },
          {
            author: "David",
            date: "2022-03-23",
            likes: 1,
            text: "Don't forget about the `rbegin` and `rend` methods from the `std::string` class, which allow you to iterate over a string in reverse order.",
          },
        ],
      },
      {
        author: "Mark",
        date: "2022-03-25",
        likes: 8,
        text: "In C#, you can reverse a string using the `Reverse` method from the `System.Linq` namespace like this: ",
        answers: [
          {
            author: "Lisa",
            date: "2022-03-26",
            likes: 0,
            text: "You can also use a `for` loop to swap characters in the string from the beginning and end, until you reach the middle.",
          },
          {
            author: "Mike",
            date: "2022-03-27",
            likes: 2,
            text: "Another option is to create a new string and copy the characters from the original string in reverse order using a `for` loop.",
          },
          {
            author: "Emily",
            date: "2022-03-28",
            likes: 1,
            text: "Don't forget about the `Substring` method, which can also be used to reverse a string in C#.",
          },
        ],
      },
    ];

    return (
        <div className="challenge-comment-section">
            {comments.map((c, i) => (
                <Comment c = {c} key ={i} />
            ))}
        </div>
    );
}

export default ChallengeDiscussionSection