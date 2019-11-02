export const formatDate = function(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}, ${date.getUTCDate()}`;
}

export const getDays = function(givenDateMs) {
  const todayDate = new Date();
  const todayTime = todayDate.getTime();
  const diffTime = Math.abs(givenDateMs - todayTime);
  const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDate;
}
