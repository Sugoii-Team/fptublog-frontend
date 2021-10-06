import React, { useEffect, useState } from 'react';
import blogApi from '../../../services/blogApi';

CommentsFeature.propTypes = {
};

function CommentsFeature(props) {

  const [commentsOfBlog, setCommentsOfBlog] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const comment = await blogApi.getCommentOfBlogById(3);

        setCommentsOfBlog(comment);

      } catch (error) {
        console.log("Failed to fetch blog list: ", error);
      }
    })();
  }, []);

  // console.log("loai cua comment: ", blogDetail);

  return (

    <div>
      <h2 className="text-center text-2xl mb-3">3 Comments</h2>

      <ol>
        {/* <li> */}
        <div>
          <footer className="grid grid-cols-5">
            <div className="col-span-1 flex justify-around">
              <a href="">
                <img className="w-20 h-20 my-auto mx-auto rounded-full" alt="img" src="http://placehold.it/70x70" />
              </a>
            </div>

            <div className="col-span-4">
              <div className="comment-content">
                <a href="#">
                  <b>Bánh Bao Wibu</b>
                </a>
                <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because
                  it is pain, but because occasionally circumstances occur in which toil and pain can procure.
                </p>
              </div>
              <div >
                <a rel="nofollow" className="comment-reply-link" href="#" title="Reply">Reply</a>
              </div>
            </div>
          </footer>

        </div>
      </ol>

      <ul>
        {commentsOfBlog.map((comment) => (
          <li className="grid grid-cols-5" key={comment.id}>
            <div className="col-span-1 flex justify-around">
              <a href="">
                <img className="w-20 h-20 my-auto mx-auto rounded-full" alt="img" src="http://placehold.it/70x70" />
              </a>
            </div>

            <div className="col-span-4">
              <div className="comment-content">
                <a href="#">
                  {/* Name of author */}
                  <b>Bánh Bao Wibu</b>
                </a>
                <p>
                  {comment.content}
                </p>
              </div>
              <div >
                <a rel="nofollow" className="comment-reply-link" href="#" title="Reply">Reply</a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* <!-- Phần reply nhô vào nè --> */}
      <ol>
        <li>
          <div>
            <footer className="my-2 grid grid-cols-6">
              <div className="flex justify-around col-start-2 col-end-2">
                <a href="#">
                  <img className="w-20 h-20 my-auto mx-auto rounded-full" alt="img"
                    src="http://placehold.it/70x70" />
                </a>
              </div>

              <div className="col-start-3 col-end-6">
                <a href="#">
                  <b>Anh Tiến Bonk Đầu</b>
                </a>
                <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because
                  those who do not know how to pursue pleasure rationally encounter consequences that are
                  extremely painful. Nor again is there anyone who loves.</p>
                <div className="reply">
                  <a rel="nofollow" className="comment-reply-link" href="#" title="Reply">Reply</a>
                </div>
              </div>
            </footer>
          </div>
        </li>
      </ol>




      <ol className="mt-8">
        <div>
          <footer className="grid grid-cols-5 mt-2">
            <div className="col-span-1 flex justify-around">
              <a href="">
                <img className="w-20 h-20 my-auto mx-auto rounded-full" alt="img" src="http://placehold.it/70x70" />
              </a>
            </div>

            <div className="col-span-4">
              <div className="comment-content">
                <a href="#">
                  <b>Giáo Làng Đọc Lệnh</b>
                </a>
                <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
                  was
                  born and I will give you a complete account of the system, and expound the actual teachings of
                  the
                  great explorer of the truth, the master-builder of human happiness.
                </p>
              </div>
              <div className="">
                <a className="" href="#" title="Reply">Reply</a>
              </div>
            </div>
          </footer>

        </div>
      </ol>
      {/* <!-- comment-list /- --> */}

      <br />
      {/* <!-- Comment Form --> */}
      <div className="w-full mt-16 p-5">
        <p className="font-medium ml-5 mb-5 text-3xl">Leave a Reply</p>
        <form method="post">
          <p>
            <textarea className="w-full border-2 rounded-lg hover:boder-300 hover:rounded-lg" id="comment"
              name="comment" placeholder="Enter your comment here..." rows="8" required="required"></textarea>
          </p>
          <div className="w-full flex justify-end">
            {/* <form> */}
            <input className="mt-3 mr-1 bg-green-300 w-xl rounded-md shadow-md cursor-pointer hover:opacity-60 
        transition ease-in-out duration-200 transform hover:-translate-y-1 hover:scale-110" type="submit" value="Submit" />
            {/* </form> */}
          </div>
        </form>
      </div>
      {/* <!-- Comment Form /- --> */}    </div>
  );
}

export default CommentsFeature;