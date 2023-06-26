export function calculateTimeDifference(uppdatedAt) {
  const currentTime = new Date();
  const lastTime = uppdatedAt;
  const updatedTime = new Date(lastTime);

  const timeDifference = currentTime.getTime() - updatedTime.getTime();
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 24) {
    return hours + " hours ago";
  } else if (days < 7) {
    return days + " days ago";
  } else {
    return updatedTime.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
}
