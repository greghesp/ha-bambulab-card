# Bambu Lab Card

> Currently in development.  Not for production use

## Configuration

Create a custom card with the following 
```yaml
type: custom:bambu-lab-card
```

By default, the card will try to automatically use the entities created by the integration.

If you want to override the sensors used, you can pass them via entities like so:

```yaml
type: custom:bambu-lab-card
entities:
  chamberTemp: sensor.chamber_temp
```

The following entities are currently supported:
- chamberTemp
- nozzleTemp
- bedTemp
