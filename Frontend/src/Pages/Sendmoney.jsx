
export const Sendmoney = () => {
  return (
    <div className="bg-gray-100 flex justify-center flex h-screen ">
      <div className="h-full flex flex-col  justify-center ">
        <div className="border h-min text-card-foreground mx-w-md space-y-8 pb-2 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col  p-3 ">
            <div className="text-3xl font-bold text-center">Send Money</div>
          </div>

          <div className="p-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <div className="text-2xl text-white">A</div>
              </div>
              <h3 class="text-2xl font-semibold">Friend's Name</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="amount"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
              Initiate Transfer
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
