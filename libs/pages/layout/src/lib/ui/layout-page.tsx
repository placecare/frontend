import { PropsWithChildren } from "react";
import { Navigation } from "./navigation";

export interface LayoutPageProps {
  navigation: any[]
}

export default function LayoutPage({ children, navigation }: PropsWithChildren<LayoutPageProps>) {
  return (
    <div>
      <main>
        <div className="flex h-full">
          <div className="h-full sticky top-0">
            {/* Navigation */}
            <Navigation navigation={navigation} />
          </div>

          <div className="w-full h-full flex flex-col">
            <div className="h-full pt-2 px-2">
              {children}
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}