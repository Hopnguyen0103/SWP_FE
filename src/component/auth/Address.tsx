import { Grid, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Address({ setAddress }: any) {
    const [city, setCity] = useState<any>(null)
    const [cityOption, setCityOption] = useState<any>(null)
    const [district, setDistrict] = useState<any>(null)
    const [districtOption, setDistrictOption] = useState<any>(null)
    const [ward, setWard] = useState<any>(null)
    const [wardOption, setWardOption] = useState<any>(null)
    useEffect(() => {
        const getCityOption = async () => {
            const response = await fetch("https://provinces.open-api.vn/api/?depth=1")
            const cities = await response.json()
            setCityOption(cities)
        }
        const getDistrictOption = async (code: any) => {
            const response = await fetch(`https://provinces.open-api.vn/api/?depth=2`)
            const cities: any[] = await response.json()
            const districts = cities.find(value => value.code === city.code).districts
            setDistrictOption(districts)
        }
        cityOption === null ? getCityOption() : null;
        city !== null ? getDistrictOption(city.code) : null;

    }, [city])
    useEffect(() => {
        const getWardOption = async (code: any) => {
            const response = await fetch(`https://provinces.open-api.vn/api/?depth=3`)
            const cities: any[] = await response.json()
            const districts: any[] = cities.find(value => value.code === city.code).districts
            const wards = districts.find(value => value.code = district.code).wards
            setWardOption(wards)
        }
        district !== null ? getWardOption(district.code) : null;
    }, [district])
    useEffect(() => {
        ward !== null ? setAddress(`Phường xã: ${ward.name}, Quận huyện: ${district.name}, Thành phố: ${city.name}`) : null;
    }, [ward])
    return (
        <Grid container spacing={1} sx={{
            marginBottom: "0.5rem"
        }}>
            <Grid item xs={6} style={{
                color: "gray",
                fontSize: "0.9rem",
                fontWeight: "600",
            }}>* Tỉnh / Thành phố
                {
                    cityOption !== null && cityOption !== undefined ? (
                        <Select
                            fullWidth
                            value={city}
                            size="small"
                            onChange={(event) => {
                                setCity(event.target.value)
                            }}
                        >
                            <MenuItem key={-1} value={undefined}></MenuItem>
                            {cityOption.map((city: any, key: any) => (
                                <MenuItem key={key} value={city}>{city.name}</MenuItem>
                            ))}
                        </Select>
                    ) : <Select fullWidth disabled={true} size="small" />
                }
            </Grid>
            <Grid item xs={6} style={{
                color: "gray",
                fontSize: "0.9rem",
                fontWeight: "600",
            }}>* Quận / Huyện
                {
                    districtOption !== null && districtOption !== undefined ? (
                        <Select
                            fullWidth
                            value={district}
                            size="small"
                            onChange={(event) => {
                                setDistrict(event.target.value)
                            }}
                        >
                            <MenuItem key={-1} value={undefined}></MenuItem>
                            {districtOption.map((district: any, key: any) => (
                                <MenuItem key={key} value={district}>{district.name}</MenuItem>
                            ))}
                        </Select>
                    ) : <Select fullWidth disabled={true} size="small" />
                }</Grid>
            <Grid item xs={6} style={{
                color: "gray",
                fontSize: "0.9rem",
                fontWeight: "600",
            }}>* Phường / Xã
                {
                    wardOption !== null ? (
                        <Select
                            fullWidth
                            value={ward}
                            size="small"
                            onChange={(event) => {
                                setWard(event.target.value)
                            }}
                        >
                            <MenuItem key={-1} value={undefined}></MenuItem>
                            {wardOption.map((ward: any, key: any) => (
                                <MenuItem key={key} value={ward}>{ward.name}</MenuItem>
                            ))}
                        </Select>
                    ) : <Select fullWidth disabled={true} size="small" />
                }</Grid>
        </Grid>
    )
}

