import { Inject, Controller, Get } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Controller("cache")
export class AdminController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async findAll(): Promise<{ [key: string]: any }> {
    //Get all keys
    const keys = await this.cacheManager.store.keys();

    //Loop through keys and get data
    const allData: { [key: string]: any } = {};
    for (const key of keys) {
      allData[key] = await this.cacheManager.get(key);
    }
    return allData;
  }
  /*
  {
    "/items": [
    {
            "id": 1,
            "name": "Nest"
    }]
  }
  */
}
