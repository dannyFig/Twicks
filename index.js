import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


console.log(document.querySelector('data-expandReply'));
document.addEventListener('click', function (e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.dataset.expandReply) {
       expandAddReply(e.target.dataset.expandReply)
    }
    else if (e.target.id.dataset.replyBtn) {
        handleReplyBtnClick(e.target.id.dataset.replyBtn)
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function expandAddReply(addReplyId) {
    document.getElementById(`add-reply-${addReplyId}`).classList.toggle('hidden')
    }

// function handleReplyBtnClick(addReplyId) {
//     const replyArea = document.getElementById(`add-reply-${addReplyId}`)
//     if (replyArea.value.trim !== "") {
//         replyArea.classList.toggle('hidden')
//         const replyInput = document.getElementById(`reply-input-${addReplyId}`).value
//     if (replyInput.value.trim() !== '') {
//         const tweetObj = tweetsData.find(tweet => addReplyId === tweet.uuid)
//         tweetObj.replies.unshift(
//             {
//                 handle: `@TrollBot66756542 💎`,
//                 profilePic: `images/troll.jpg`,
//                 tweetText: replyInput.value.trim()
//             }
//         )
//     render()
//     }

//     } else {
//         console.error(`Reply area not found for ID: ${addReplyId}`)
//     }
//     }




function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-btn')
    console.log(tweetInput.value)
    if (tweetInput.value) {
        tweetsData.unshift(
            {
                handle: `@Scrimba`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
        render()
        tweetInput.value = ''
    }
}

function getFeedHtml() {
    let feedHtml = ``

    tweetsData.forEach(function (tweet) {

        let likeIconClass = ''

        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        let retweetIconClass = ''

        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                        </div>
                    </div>
                `
            })
        }

    feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-solid fa-plus" 
                                id="add-btn-${tweet.uuid}" 
                                data-expand-reply="${tweet.uuid}"></i>
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                </div>            
            </div>
            <div class="hidden" id="add-reply-${tweet.uuid}">
                <div class="reply-input-area">
                    <img src="images/chucknorris.jpeg" class="profile-pic">
                    <textarea placeholder="What's happening?" id="reply-input-${tweet.uuid}"></textarea>
                </div>
                <button data-reply-btn="${tweet.uuid}">Add Comment</button>
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>
        </div>
    `
    })
return feedHtml
}

function render() {
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

