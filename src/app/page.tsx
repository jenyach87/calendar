
import Image from "next/image";
import Link from "next/link";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Calendar from "./calendar/page";
import CalendarFull from "./calendarFull/page";
export default function Home() {
  return (
    <>
      {/* <Tabs aria-label="Options" className="flex justify-around items-center">
        <Tab key="photos" title="Week">
          <Card>
            <CardBody>
              <Calendar />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Month" className="">
          <Card>
            <CardBody>
              <CalendarFull />
            </CardBody>
          </Card>
        </Tab>
      </Tabs> */}
    </>
  );
}
