/* 
    Join both tables based on the wallet address, 
    condition the block_height
    CASE used to calculate the USD value of each denomination and sum total
    HAVING only show address with a USD value of at least 500
*/

SELECT b.wallet_address,
    SUM(CASE 
            WHEN b.denom = 'usdc' THEN b.amount * 0.000001 
            WHEN b.denom = 'swth' THEN b.amount * 0.00000005 
            WHEN b.denom = 'tmz' THEN b.amount * 0.003 
            ELSE 0 
        END) AS usd_value
FROM balances b
INNER JOIN trades t ON b.wallet_address = t.wallet_address AND b.block_height > 730000
GROUP BY b.wallet_address
HAVING usd_value >= 500
