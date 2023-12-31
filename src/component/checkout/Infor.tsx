import { Typography, Button } from '@mui/material'
import React from 'react'
import { formatNumber } from '../../../package/function'
import { Payment } from '../../../package/model/payment'
import { StyledButton } from '../theme/button/StyledButton'

const CheckoutInfor = ({ total, selectAddress, selectPayment, cost }: { total: number, selectAddress: Address | null, selectPayment: Payment | null, cost: number }) => {
    return (
        <div
            style={{
                paddingTop: "1rem",
                marginTop: "2.6rem",
                borderTop: "1px solid gray",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    marginBottom: "1rem",
                    fontWeight: "650",
                }}
            >
                Thông tin đơn hàng
            </Typography>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
               
                <Typography
                    sx={{
                        fontWeight: "650",
                        color: "gray",
                    }}
                >
                    {formatNumber(+total)} VND
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "650",
                        color: "gray",
                    }}
                >
                    Tạm tính{" "}
                </Typography>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "650",
                        color: "gray",
                    }}
                >
                    Phí vận chuyển
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "650",
                        color: "gray",
                    }}
                >
                    {formatNumber(cost)} VND
                </Typography>
            </div>
            <div
                style={{
                    margin: "1rem 0rem 1rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid gray",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        color: "gray",
                    }}
                >
                    Tổng cộng
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "600",
                        color: "gray",
                    }}
                >
                    {formatNumber(cost + +total)} VND
                </Typography>
            </div>
            <StyledButton
                type="submit"
                variant='contained'
                fullWidth
                disabled={
                    selectAddress !== null && selectPayment !== null
                        ? false
                        : true
                }
            >
                <Typography
                    sx={{
                        fontWeight: "600",
                        color: "white",
                    }}
                >
                    đặt hàng
                </Typography>
            </StyledButton>
        </div>
    )
}

export default CheckoutInfor