-- QUESTIONS
-- 1. Find the earliest date a user joined
SELECT created_at AS earliest_date FROM users 
ORDER BY created_at LIMIT 1;

...or..
SELECT DATE_FORMAT(MIN(created_at), '%M %D %Y') AS earliest_date
FROM users;


-- 2. Fin the email of the first user
SELECT * FROM users 
ORDER BY created_at LIMIT 1;

...or...
SELECT *
FROM users WHERE created_at = (SELECT min(created_at) FROM users);

--3. USers according to the month they joined
SELECT DATE_FORMAT(created_at, "%M") AS month,
    COUNT(*) AS total
FROM users
GROUP BY month
ORDER BY total DESC
;

--4. Count the number of users with yahoo emails
SELECT COUNT(email) FROM users
WHERE email LIKE '%@yahoo.com';

--5. Calculate total number of users for each email host
--gmail, yahoo, hotmail, other
SELECT 
    CASE
        WHEN email LIKE '%@gmail.com' THEN 'gmail'
        WHEN email LIKE '%@yahoo.com' THEN 'yahoo'
        WHEN email LIKE '%@hotmail.com' THEN 'hotmail'
        ELSE 'other'
    END AS provider,
    count(*) AS total_users
FROM users
GROUP BY provider
;