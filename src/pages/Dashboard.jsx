import React, { Fragment, useEffect } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { Card, CardBody, CardHeader, Col, Container, Media, Row } from 'reactstrap'
import { Box, MessageSquare, Navigation, Users } from 'react-feather'
import CountUp from 'react-countup'
import { useState } from 'react'
import { getFetch } from '../config/fetchData'
import { Bar, Line } from 'react-chartjs-2'
import { Chart } from "react-google-charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  ArcElement,
  Filler,
  RadialLinearScale
);

const borderColor = [`#ff0000`, `#0000ff`, `#ff00ff`, '#009933', '#ffff00','#6600cc'];
const backgroundColor = [`#ff0000`, `#0000ff`, `#ff00ff`, '#009933', '#ffff00','#6600cc'];

const buyData = {
  labels: ["", "10", "20", "30", "40", "50"],
  datasets: [
    {
      backgroundColor: "transparent",
      borderColor: "#13c9ca",
      data: [0, 0, 0, 46, 0, 0, 0, 0, 0, 0, 0, 0],
      lineTension: 0.4,
    },
    {
      backgroundColor: "transparent",
      borderColor: "#a5a5a5",
      data: [0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0],
      lineTension: 0.4,
    },
    {
      backgroundColor: "transparent",
      borderColor: "#ff8084",
      data: [0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0],
      lineTension: 0.4,
    },
    {
      backgroundColor: "transparent",
      borderColor: "#f0b54d",
      data: [0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0],
      lineTension: 0.4,
    },
    {
      backgroundColor: "transparent",
      borderColor: "rgb(75, 192, 192)",
      data: [0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0],
      lineTension: 0.4,
    },
  ],
};
const buyOption = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    xAxes: {
      gridLines: {
        color: '#f8f8f8'
      },
    },
    yAxes: {
      gridLines: {
        color: '#f8f8f8'
      },

    }
  },
}
const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
  ],
};
const lineOptions = {
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    xAxes: {
      barPercentage: 0.7,
      categoryPercentage: 0.4,
      gridLines: {
        display: false,
      },
    },
    yAxes: {
      barPercentage: 0.7,
      categoryPercentage: 0.4

    }
  },
}
const Dashboard = () => {
  const [numStatus1, setNumStatus1] = useState(0);
  const [numStatus2, setNumStatus2] = useState(0);
  const [numStatus3, setNumStatus3] = useState(0);
  const [numStatus4, setNumStatus4] = useState(0);
  const [dataTPSCategory, setDataTPSCategory] = useState(lineData);
  const [dataTPSSubCategory, setDataTPSSubCategory] = useState(lineData);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);


  useEffect(() => {
    getFetch(`/api/server/dashboard/NumberOrder`)
      .then((result) => {
        setNumStatus1(result.Data[0].value);
        setNumStatus2(result.Data[1].value);
        setNumStatus3(result.Data[2].value);
        setNumStatus4(result.Data[3].value);
      })
      .catch((error) => {
        console.log(error);
      })
    //
    getFetch(`/api/server/dashboard/NumberProductByCategory`)
      .then((result) => {
        if (result.ErrorCode === 0) {
          let lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: result.Data.map((e, i) => {
              return {
                label: e.title,
                data: e.value,
                borderColor: borderColor[i],
                backgroundColor: backgroundColor[i],
                borderWidth: 2,
                barPercentage: 0.7,
                categoryPercentage: 0.4,
              }
            }),
          }
          setDataTPSCategory(lineData);
        }
      })
      .catch((error) => {
        console.log(error);
      })

    getFetch(`/api/server/category/all`)
      .then((result) => {
        if (result.ErrorCode === 0) {
          setCategories(result.Data);
          setCategoryId(result.Data[0].id)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (categoryId) {
      getFetch(`/api/server/dashboard/NumberProduct/${categoryId}`)
        .then((result) => {
          console.log(result);
          if (result.ErrorCode === 0) {
            const lineData = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: result.Data[0].SubCategory.map((e, i) => {
                return {
                  label: e.title,
                  data: e.value,
                  borderColor: borderColor[i],
                  backgroundColor: backgroundColor[i],
                  borderWidth: 2,
                  barPercentage: 0.7,
                  categoryPercentage: 0.4,
                }
              })
            };
            setDataTPSSubCategory({
              ...lineData,
              datasets: [...lineData.datasets, {
                label: result.Data[0].Category[0].title,
                data: result.Data[0].Category[0].value,
                borderColor: borderColor[result.Data[0].SubCategory.length],
                backgroundColor: backgroundColor[result.Data[0].SubCategory.length],
                borderWidth: 2,
                barPercentage: 0.7,
                categoryPercentage: 0.4,
              }]
            });

            console.log(dataTPSSubCategory);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [categoryId])
  return (
    <Fragment>
      <Breadcrumb title="Dashboard" parent="Dashboard" />
      <Container fluid={true}>
        <Row>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-warning">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Navigation className="font-warning" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Xác nhận</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={numStatus1} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden  widget-cards">
              <CardBody className="bg-secondary ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Box className="font-secondary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Đang chờ gửi</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={numStatus2} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className="o-hidden widget-cards">
              <CardBody className="bg-primary">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <MessageSquare className="font-primary" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Đang gửi</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={numStatus3} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3 xl-50" md="6">
            <Card className=" o-hidden widget-cards">
              <CardBody className="bg-danger ">
                <Media className="static-top-widget row">
                  <div className="icons-widgets col-4">
                    <div className="align-self-center text-center">
                      <Users className="font-danger" />
                    </div>
                  </div>
                  <Media body className="col-8">
                    <span className="m-0">Hoàn thành</span>
                    <h3 className="mb-0">
                      <CountUp className="counter" end={numStatus4} />
                      <small> This Month</small>
                    </h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>

          <Col xl="12 xl-100">
            <Card>
              <CardHeader>
                <h5>Total number of products sold by category</h5>
              </CardHeader>
              <CardBody>
                <div className="market-chart">
                  <Bar
                    data={dataTPSCategory}
                    options={lineOptions}
                    width={778}
                    height={308}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Total number of products sold by subcategory</h5>
              </CardHeader>
              <CardBody className="sell-graph">
                <Bar
                  data={dataTPSSubCategory}
                  options={buyOption}
                  width={700}
                  height={350}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Dashboard